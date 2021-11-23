import React, {useState, useEffect} from "react";
//useParams para pegar os parâmetros da url
import { Link, useHistory, useParams } from "react-router-dom";
import "./style.css";
import api from "../../services/api";

export default function Profile(){
    const {id} = useParams();
    //Usuário inicial antes de criar
    const history = useHistory();
    const initUser ={name: "", email: "", idade: 0, empresa: "", temContabancaria: false}       //Cria um user vazio antes de salvar no BD

    //setUser para att o usuário. Inicializa o usuário inicial passando o initUer
    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if (id) {       //Veriica se existe ID na url ao carregar o componente
            //Se n colocar a desestruturação vai dar erro pq no User do BD tem o atributo ID e no obj initUser n tem, então ocorre erro ao tentar setar o ID vindo do Banco no initUser (onde n foi criado esse atributo)
            api.get("/users/" + id).then(response => {
                //O "..." faz com q preencha os campos q achar e ignorar o campo q n encontrar (ID neste caso)
                setUser(...response.data)
            })
        }
    }, []);

    function onSubmit(event){
        event.preventDefault();                     //Evita a parte de submissão para n recerregar a pág
        const method = id ? "put" : "post";         //Se existir ID é pq vai att algum user e se n existir, vai criar um novo
        //"/users/" + id : /users/${id}" :  
        const url = id ? "/users/" + id : "/users";

        api[method](url, user).then((response) => {    
            history.push("/");              //Vai para a tela após criar o user
        })
    }
    
    //Qnd fizer a mudança chama o event
    function onChange(event){
        const {name, value} = event.target;         //Fazendo desestruturação
        //Notação "..." q pega o resto dos atributos. Qnd chama o onChange n se sabe qual parâmetro está vindo pq n se sabe qual campo do form está sendo preenchido. Se tiver alterando o email, pega o atributo "email" e adiciona oq foi alterado nele. Atribue o valor correspondente
        setUser({...user, [name]:value})
    }

    return (
        <div id="profile-container">
            <h1>Cadastro de Usuário</h1>

            <form onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input name="name" onChange={onChange} value={user.name} required></input>

                <strong>Email:</strong>
                <input type="email" onChange={onChange} name="email" value={user.email} required></input>

                <strong>Idade:</strong>
                <input type="number" name="idade" onChange={onChange} value={user.idade} required></input>

                <strong>Empresa:</strong>
                <input name="empresa" onChange={onChange} value={user.empresa} required></input>

                <div className="actions">
                    {/*Usa a classe Link em vez de "button" do html. Pode fazer da primeira ou segunda forma com useHistory, as duas linhas possuem a mesma funcionalidade*/}
                    <Link className="button" to={"/"}>Voltar</Link>

                  {/*  <Link className="button" onClick={() => history.push("/")}>Voltar</Link>*/}
                    <button className="button" type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}