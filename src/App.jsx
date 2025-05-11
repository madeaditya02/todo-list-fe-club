import { useRef, useState } from "react"
import Button from "./components/Button"
import InputForm from "./components/InputForm"

function App() {
  const [show, setShow] = useState()
  const [list, setList] = useState([
    {
      id: 1,
      activity: "Mengerjakan UP",
      date: "2025-04-14"
    },
    {
      id: 2,
      activity: "Makan",
      date: "2025-04-15"
    }
  ])
  const showAddForm = () => {
    setShow("tambah")
  }
  const closeForm = () => {
    setShow(false)
  }

  const [activity, setActivity] = useState("")
  const [dates, setDates] = useState("")
  const formElement = useRef()

  const submitForm = (event) => {
    event.preventDefault()
    const lastItem = list[list.length - 1]
    const newActivity = {
      id: lastItem.id + 1,
      activity: activity,
      date: dates
    }
    setList([...list, newActivity])
    formElement.current.reset()
    setShow(false)
  }

  const [selectedActivities, setSelectedActivities] = useState([])
  const updateCheck = (event, id) => {
    if (event.target.checked) {
      setSelectedActivities([...selectedActivities, id])
    } else {
      const filteredSelected = selectedActivities.filter((itemId) => {
        return itemId != id
      })
      setSelectedActivities(filteredSelected)
    }
  }
  const deleteActivity = (id) => {
    const filteredList = list.filter((item) => {
      return item.id != id
    })
    setList(filteredList)
  }
  const deleteActivities = () => {
    const filteredList = list.filter((item) => {
      return !selectedActivities.includes(item.id)
    })
    setList(filteredList)
  }

  const [editedItem, setEditedItem] = useState({})
  const showEditForm = (item) => {
    setShow("edit")
    setEditedItem(item)
    setActivity(item.activity)
    setDates(item.date)
  }
  const submitEdit = (event) => {
    event.preventDefault()
    const editedList = list.map((item) => {
      if (item.id == editedItem.id) {
        return {
          ...item,
          activity: activity,
          date: dates
        }
      } else {
        return item
      }
    })
    setList(editedList)
    setShow(null)
    setActivity("")
    setDates("")
  }
  return (
    <div className="w-2xl mx-auto mt-[85px]">
      <h1 className="text-5xl font-semibold text-center">Todo List</h1>
      {show == "tambah" ? (
        <form action="" className="mt-10" onSubmit={submitForm} ref={formElement}>
          <div className="flex gap-8">
            <InputForm label="Aktivitas" type="text" className="w-100" onChange={(event) => setActivity(event.target.value)} />
            <InputForm label="Tanggal" type="date" className="flex-grow" onChange={(event) => setDates(event.target.value)} />
          </div>
          <div className="flex gap-4 mt-4">
            <Button type="submit">Add Task</Button>
            <Button type="reset" click={closeForm}>Cancel</Button>
          </div>
        </form>
      ) : (show == "edit" ? (
        <form action="" className="mt-10" onSubmit={submitEdit} ref={formElement}>
          <div className="flex gap-8">
            <InputForm label="Aktivitas" type="text" className="w-100" onChange={(event) => setActivity(event.target.value)} value={activity} />
            <InputForm label="Tanggal" type="date" className="flex-grow" onChange={(event) => setDates(event.target.value)} value={dates} />
          </div>
          <div className="flex gap-4 mt-4">
            <Button type="submit">Edit Task</Button>
            <Button type="reset" click={closeForm}>Cancel</Button>
          </div>
        </form>
      ) : (
        <button className="w-full px-4 py-2.5 flex items-center gap-4 border border-dashed rounded-lg mt-10 cursor-pointer" onClick={showAddForm}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Task
        </button>
      ))}

      <div className="mt-8">
        {list.map((item) => (
          <div className="flex justify-between items-center mb-4" key={item.id}>
            <div className="flex gap-4 items-center">
              <input type="checkbox" className="rounded-xl size-4" onChange={(event) => updateCheck(event, item.id)} />
              <div className="activity">
                <p>{item.activity}</p>
                <div className="flex items-center gap-1.5 text-sm mt-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  {item.date}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="edit" onClick={() => showEditForm(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
              <button className="hapus" onClick={() => deleteActivity(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        )
        )}
        <hr />
        <button className="flex gap-4 items-center mt-6" onClick={deleteActivities}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Delete Selected Activity
        </button>
      </div>
    </div >
  )
}

export default App
