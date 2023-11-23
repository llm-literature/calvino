import re
import time
import pathlib
import json
import os
import shutil
import requests
from openai import OpenAI



OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


CITY_TYPES = [
    "memory", "desire", "signs", "thin", "trading", "eyes", "names", "dead", "sky", "continuous", "hidden"
]


def get_data_root_path() -> str:
    p = f"{pathlib.Path(__file__).cwd().parent}/public/city"
    return p


def load_and_check_city_type() -> dict:
    with open(f"{DATA_ROOT_DIR}/data.json") as f:
        data = json.load(f)
    for city in data["cities"]:
        assert city["type"] in CITY_TYPES, city["name"]
    return data


DATA_ROOT_DIR = get_data_root_path()
city_data = load_and_check_city_type()


def gen_image_dirs():
    for city_type in CITY_TYPES:
        p = pathlib.Path(f"{DATA_ROOT_DIR}/{city_type}")
        if p.exists() is False:
            p.mkdir(exist_ok=True, parents=False)


def gen_fake_image():
    for city in city_data["cities"]:
        city_type, city_name = city["type"], city["name"]
        p = pathlib.Path(f"{DATA_ROOT_DIR}/{city_type}/{city_name}.png").absolute()
        with open(p, 'wb') as f:
            f.write(b'')


def remove_image():
    for city in city_data["cities"]:
        city_type, city_name = city["type"], city["name"]
        p = pathlib.Path(f"{DATA_ROOT_DIR}/{city_type}/{city_name}.png").absolute()
        if p.exists():
            p.unlink()


def keep_chinese_words(text):
    pattern = re.compile(r'[^\u4e00-\u9fff]')
    cleaned_text = re.sub(pattern, '', text)
    cleaned_text = re.sub(r'\s', '', cleaned_text)
    return cleaned_text


class OpenAIGenImage:
    def __init__(self):
        self.client = OpenAI(
            base_url="https://gateway.ai.cloudflare.com/v1/6e225471755c27480becde65253a9e8f/cf-openai/openai",
        )

    def gen_image(self, image_path: str, image_text: str):
        image_text_cleaned = keep_chinese_words(image_text)
        prompt = f"根据文学巨匠卡尔维诺的作品《看不见的城市》中对城市的描述生成图片:{image_text_cleaned}"
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        image_url = response.data[0].url
        print(f"image url: {image_url}")
        image_response = requests.get(image_url, stream=True)
        if image_response.status_code == 200:
            with open(image_path, "wb") as image_file:
                image_response.raw.decode_content = True
                shutil.copyfileobj(image_response.raw, image_file)
            print(f"[Success]Image {image_path} saved successfully.")
        else:
            print("[Fail]Failed to download the image {image_path}.")


def gen_real_image():
    image_gen_client = OpenAIGenImage()
    for city in city_data["cities"]:
        city_type, city_name, city_text = city["type"], city["name"], city["description"]
        p = pathlib.Path(f"{DATA_ROOT_DIR}/{city_type}/{city_name}.png").absolute()
        if p.exists():
            print(f"[Skip]{p}")
            continue
        print("=" * 30)
        print(f"[Start]{city_type, city_name}")
        try:
            image_gen_client.gen_image(image_path=p, image_text=city_text)
        except Exception as e:
            print(f"[Error]:{city_name}, error: {e}")
        time.sleep(60)
        print(f"[Finished]{city_type, city_name}")


if __name__ == '__main__':
    # gen_image_dirs()
    # remove_image()
    gen_real_image()
