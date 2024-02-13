export const Tree = (props) => (
    <ul className={props.treeClassName}>
      {props.data.map((branch, index) => (
        <li key={index}>
          {branch.childNodes.length > 0 && (<span className={props.liClass} onClick={props.treeHandler}></span>)}
          {`${branch.name}: стоимость от ${branch.price} ₽.`}
          {branch.childNodes.length > 0 && (
            <ul className={props.ulClass} >
              <Tree data={branch.childNodes} ulClass={props.ulClass} liClass={props.liClass} treeHandler={props.treeHandler} />
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
