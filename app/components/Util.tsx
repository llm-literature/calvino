export default function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const cosBase: string = 'https://calvino.aiglimpse.org/public';

export { cosBase, capitalizeString };
