
import { useState } from 'react';
import {getTasks} from "./utils";
import "react-responsive-modal/styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";


function App () {
    const tasksData = document.getElementById('app')?.getAttribute('data-tasks');
    // const initialTasks = JSON.parse(tasksData || '[]');
    const initialTasks = [
        { id: '1', title: 'Task 1', description: 'Description 1' },
        { id: '2', title: 'Task 2', description: 'Description 2' },
        { id: '3', title: 'Task 3', description: 'Description 3' },
    ];
    const [tasks, setTasks] = useState(initialTasks || []);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [modalEditTask, setModalEditTask] = useState({id: '', title: '', description: ''});
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [modalDeleteTaskId, setModalDeleteTaskId] = useState('');
    const [newTask, setNewTask] = useState({title: '', description: ''});

    const reloadTasks = () => {
        getTasks().then((tasksData) => setTasks(tasksData));
    };

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <ModalEdit isModalEditOpen={isModalEditOpen}
                       setIsModalEditOpen={setIsModalEditOpen}
                       modalEditTask={modalEditTask}
                       setModalEditTask={setModalEditTask}
                       reloadTasks={reloadTasks}
            />
            <ModalDelete isModalDeleteOpen={isModalDeleteOpen}
                         setIsModalDeleteOpen={setIsModalDeleteOpen}
                         modalDeleteTaskId={modalDeleteTaskId}
                         reloadTasks={reloadTasks}
            />
            <div className="left-side">
                {tasks.length > 0 ? (
                    <TaskList tasks={tasks}
                              setIsModalEditOpen={setIsModalEditOpen}
                              setModalEditTask={setModalEditTask}
                              setIsModalDeleteOpen={setIsModalDeleteOpen}
                              setModalDeleteTaskId={setModalDeleteTaskId}
                              setTasks={setTasks}
                    />
                ) : (
                    <div className="no-tasks">
                        No tasks yet :(
                    </div>
                )}
            </div>
            <div className="right-side">
                <div className="right-side-wrapper">
                    <AddTaskForm newTask={newTask}
                                 setNewTask={setNewTask}
                                 reloadTasks={reloadTasks}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
