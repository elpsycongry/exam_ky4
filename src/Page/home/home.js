import {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./home.css"

function Home() {
    const [list, setList] = useState([]);
    const [pageable, setPageable] = useState({
        page: 1,
        limit: 4,
    });
    const [pagination, setPagination] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/users?_page=${pageable.page}&_limit=${pageable.limit}`).then(
            res => {
                let total = res.data.pagination._totalRows;
                let current = res.data.pagination._limit;
                let pages = []
                for (let i = 0; i < total / current; i++) {
                    pages.push(i)
                }
                setPagination(pages)
                setList(res.data.data)
            }
        )
    }, [pageable]);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/api/users/filter?email=${inputRef.current.value}`).then(
            res => {
                setSearchValue(inputRef.current.value)
                setList(res.data)
            }
        )
    }

    function deleteUser(id) {
        if (window.confirm("Bạn có chắc là muốn xoá không ?")) {
            axios.delete(`http://localhost:3001/api/users/${id}`)
            window.location.reload(false)
        }
    }

    return (
        <div className={"container text-center mt-5"}>
            <div>
                <h1>Danh sách người dùng</h1>
            </div>
            <div className={"row mt-4"}>
                <form className={"input-group-t"} onSubmit={handleSubmit}>
                    <input required ref={inputRef} className={"input-text"} placeholder={"Email"}/>
                    <input type={"submit"} className={"btn btn-primary i-sub "} value={"Tìm kiếm"}/>
                </form>
            </div>
            <table className={"table"}>
                <thead>
                <tr>
                    <th scope={"col"}>#</th>
                    <th scope={"col"}>Name</th>
                    <th scope={"col"}>Email</th>
                    <th scope={"col"}>Birthday</th>
                    <th scope={"col"}></th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((user) =>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.birthday}</td>
                            <td>
                                <button onClick={() => {
                                    deleteUser(user.id)
                                }} className={"btn btn-danger"}>Xoá
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            {(searchValue.length === 0) &&
                <div>
                    {pagination.map(currentPage => {
                        return (
                            <span
                                onClick={() => {
                                    setPageable({...pageable, page: currentPage + 1})
                                }}
                                className={`${pageable.page === currentPage + 1 ? "btn btn-primary" : "btn"}`}
                            >{currentPage + 1}</span>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Home;