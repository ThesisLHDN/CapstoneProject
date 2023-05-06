function convertDate(d) {
  const date = new Date(d);
  return date.getDate() + ' ' + date.toLocaleString('en-us', {month: 'short'});
}

function SprintHeader(props) {
  const time =
    convertDate(props.col.startDate) + ' - ' + convertDate(props.col.endDate);
  return (
    <div className="flex text-sm">
      <div className="font-bold">{props.col.cyclename}</div>

      {props.col.cyclename !== 'Backlog' ? (
        <div className="ml-2 text-gray-600">{time}</div>
      ) : (
        <></>
      )}

      <div className="ml-2 text-gray-600">
        {/* {props.col.items.length > 1
          ? '(' + props.col.items.length + ' issues)'
          : '(' + props.col.items.length + ' issue)'} */}
      </div>
    </div>
  );
}

export default SprintHeader;
