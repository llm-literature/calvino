export default function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const cosBase: string = "https://datahonor-1252464519.cos.ap-beijing-1.myqcloud.com/calvino/public"

export {cosBase, capitalizeString}
