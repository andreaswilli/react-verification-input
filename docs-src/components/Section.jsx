export default function Section({
  markdown,
  type,
  name,
  removeHeading = false,
}) {
  const md = markdown();
  let fromIndex = md.props.children.findIndex(
    (c) => c.props?.children === name
  );
  let toIndex =
    fromIndex +
    1 +
    md.props.children
      .slice(fromIndex + 1)
      .findIndex((c) => type === (c?.type?.name ?? c?.type));

  if (toIndex <= fromIndex) {
    toIndex = md.props.children.length - 1;
  }

  if (removeHeading) {
    fromIndex += 1;
  }

  return <>{md.props.children.slice(fromIndex, toIndex)}</>;
}
