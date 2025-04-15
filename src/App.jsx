import { useState } from "react"
import Button from "./components/Button"
import InputForm from "./components/InputForm"

function App() {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([
    {
      activity: "Mengerjakan UP",
      date: "2025-04-14"
    },
    {
      activity: "Makan",
      date: "2025-04-15"
    }
  ])
  const showForm = () => {
    setShow(true)
  }
  const closeForm = () => {
    setShow(false)
  }

  const [activity, setActivity] = useState("")
  const [dates, setDates] = useState("")

  const submitForm = (event) => {
    event.preventDefault()
    const newActivity = {
      activity: activity,
      date: dates
    }
    setList([...list, newActivity])
  }
  return (
    <div className="w-2xl mx-auto mt-[85px]">
      <h1 className="text-5xl font-semibold text-center">Todo List</h1>
      {show ? (
        <form action="" className="mt-10" onSubmit={submitForm}>
          <div className="flex gap-8">
            <InputForm label="Aktivitas" type="text" className="w-100" onChange={(event) => setActivity(event.target.value)} />
            <InputForm label="Tanggal" type="date" className="flex-grow" onChange={(event) => setDates(event.target.value)} />
          </div>
          <div className="flex gap-4 mt-4">
            <Button type="submit">Add Task</Button>
            <Button type="reset" click={closeForm}>Cancel</Button>
          </div>
        </form>
      ) : (
        <button className="w-full px-4 py-2.5 flex items-center gap-4 border border-dashed rounded-lg mt-10 cursor-pointer" onClick={showForm}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Task
        </button>
      )}

      <div className="mt-8">
        {list.map((item) => (
          <div className="flex justify-between items-center mb-4" key={item.id}>
            <div>
              <p>{item.activity}</p>
              <div className="flex items-center gap-1.5 text-sm mt-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {item.date}
              </div>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        )
        )}
      </div>
    </div>
  )
}

export default App
