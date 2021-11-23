import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { NavLink, useParams } from "react-router-dom";
import "./style.css";

export default function User() {
  const {id} = useParams();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get("users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Falha ao tentar deletar");
    }

    try {
      //Apaga a conta pelo parâmetro do ID do usuário
      await api.delete(`/bankAccount_usuario/${id}`);
    } catch (err) {
      alert("Falha ao tentar deletar");
    }
  }

  return (
    <div id="user-container">
      <h1>Lista de Usuários</h1>
      <NavLink className="button" id="create-link" to={"/create"}>
        Criar Usuário
      </NavLink>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <strong>Nome</strong>
            <p>{user.name}</p>
            <strong>Email</strong>
            <p>{user.email}</p>
            <strong>Idade</strong>
            <p>{user.idade}</p>
            <strong>Empresa</strong>
            <p>{user.empresa}</p>

            <div className="actions">
              <button
                className="button"
                onClick={() => handleDelete(user.id)}
                type="button"
              >
                Deletar
              </button>
              <NavLink className="button" to={`/update/${user.id}`}>
                Editar usuário
              </NavLink>
              <div>
                {
                user.temContabancaria?
                (<NavLink className="button" id="update-account" to={`/updatebankAccount/${user.id}`}>
                  Editar Saldo Bancário
                </NavLink>)
                :
                (<NavLink className="button" id="create-account" to={`/createBankAccount/${user.id}`}>
                  Criar Conta Bancária
                </NavLink>)

                }
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
