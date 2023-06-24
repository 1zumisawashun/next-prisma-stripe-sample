type PrintObjectProps = {
  content: object
}

export const PrintObject: React.FC<PrintObjectProps> = ({ content }) => {
  const formattedContent: string = JSON.stringify(content, null, 2)
  return <pre>{formattedContent}</pre>
}
