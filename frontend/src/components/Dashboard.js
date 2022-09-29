import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Checkbox from "./Checkbox";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        console.log(isCheck)

        setIsCheck(users.map(user => user.id));
        console.log(isCheck)

        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    let handleClick = e => {
        const {id} = e.target;
        const checked = isCheck.find(item => item === parseInt(id));

        if (checked === parseInt(id)) {
            setIsCheck(isCheck.filter(item => item !== parseInt(id)));
        } else {
            setIsCheck([...isCheck, parseInt(id)]);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const destroyUsers = async (e) => {
        e.preventDefault();

        isCheck.forEach(
             destroyUser
        );
        window.location.reload();
    }

    const destroyUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    const blockUsers = async (e) => {
        e.preventDefault();

        isCheck.forEach(
            blockUser
        );
        window.location.reload();
    }

    const blockUser = async (userId) => {
        try {
            await axios.post(`http://localhost:5000/users/${userId}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

        return (
            <div className="container">
                <h1>Welcome Back: {name}</h1>
                    <table className="table is-striped is-fullwidth is-hoverable">
                    <thead>
                    <tr>
                        <th>
                            <Checkbox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={handleSelectAll}
                                isChecked={isCheckAll}
                            />
                        </th>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Register at</th>
                        <th>Last login at</th>
                        <th>Blocked</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>
                                <Checkbox
                                    key={user.id}
                                    type="checkbox"
                                    id={user.id}
                                    handleClick={handleClick}
                                    isChecked={isCheck.includes(user.id)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt}</td>
                            <td>{user.lastLogInAt}</td>
                            <td>{user.status.toString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="buttons">
                    <button type="button" className="button is-danger is-normal" onClick={destroyUsers}>Delete
                    </button>
                    <button type="button" className="button is-warning is-normal" onClick={blockUsers}>Block</button>
                </div>
            </div>
        )
}
export default Dashboard
