const Course = ({course}) => {
    return (
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }
  
  const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <ul >
        {parts.map((part, id) => <li key={id}><Part info={part}/></li>)}
      </ul>
    )
  }
  
  const Part = ({info}) => {
    return (
      <p>{info.name} {info.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <b>Total of {total} exercises</b>
    )
  }

  export default Course