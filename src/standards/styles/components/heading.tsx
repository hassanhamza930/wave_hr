interface HeadingInterface {
  text: string;
  color?: string;
  customStyles?: string;
  textSize?: string;
  fontWeight?: string;
}

function Heading({
  color = 'text-black',
  text,
  customStyles = '',
}: HeadingInterface) {
  return (
    <div className={`${color} ${customStyles}  text-4xl font-bold`}>{text}</div>
  );
}

function SubHeading({
  color = 'text-black',
  text,
  customStyles = '',
}: HeadingInterface) {
  return <div className={`${color} ${customStyles} text-md`}>{text}</div>;
}

const Text = ({
  color = 'text-blue',
  text,
  customStyles = '',
  textSize = 'text-sm',
  fontWeight,
}: HeadingInterface) => (
  <div className={`${color} ${customStyles} ${textSize} ${fontWeight}`}>
    {text}
  </div>
);

export { SubHeading, Text, Heading };
