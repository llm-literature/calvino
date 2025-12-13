import json
import os

# Mapping of English names to Chinese names
cn_names = {
    "diomira": "迪奥米拉",
    "isidora": "伊西多拉",
    "dorothea": "多罗泰亚",
    "zaira": "扎伊拉",
    "anastasia": "阿纳斯塔西亚",
    "tamara": "塔马拉",
    "zora": "左拉",
    "despina": "苔斯皮那",
    "zirma": "吉尔玛",
    "isaura": "伊萨乌拉",
    "maurilia": "莫利里亚",
    "fedora": "菲朵拉",
    "zoe": "佐艾",
    "zenodia": "珍诺比亚",
    "euphemia": "欧菲米亚",
    "zobeide": "佐贝伊德",
    "hypatia": "伊帕奇亚",
    "armilla": "阿尔米拉",
    "chloe": "克洛艾",
    "valdrada": "瓦尔德拉达",
    "olivia": "奥利维亚",
    "sophronia": "索伏洛尼亚",
    "eutropia": "埃乌特洛比亚",
    "zemrude": "珍茹德",
    "aglaura": "阿格劳拉",
    "octavia": "奥塔维亚",
    "ersilia": "艾尔西里亚",
    "baucis": "宝琪",
    "leandra": "莱安德拉",
    "melania": "梅拉尼亚",
    "esmeralda": "斯麦拉尔迪那",
    "phyllis": "菲利德",
    "pyrrha": "皮拉",
    "adelma": "阿德尔玛",
    "eudoxia": "埃乌多西亚",
    "moriana": "莫里亚纳",
    "clarice": "克拉莉切",
    "eusapia": "埃乌萨皮娅",
    "beersheba": "贝尔萨贝阿",
    "leonia": "莱奥尼亚",
    "irene": "伊莱那",
    "argia": "阿尔嘉",
    "thekla": "泰克拉",
    "trude": "特鲁德",
    "olinda": "欧林达",
    "laudomia": "劳多米亚",
    "perinthia": "佩林奇亚",
    "procopia": "普罗科比亚",
    "raissa": "莱萨",
    "andria": "安德里亚",
    "cecilia": "切奇利雅",
    "marozia": "马洛奇亚",
    "penthesilea": "潘特熙莱雅",
    "theodora": "特奥朵拉",
    "berenice": "贝莱尼切"
}

file_path = 'public/city/data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for city in data['cities']:
    name = city['name']
    if name in cn_names:
        city['cnName'] = cn_names[name]
    else:
        print(f"Warning: No Chinese name found for {name}")

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully updated data.json with cnName fields.")
