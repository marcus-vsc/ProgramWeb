import React, {useState, useEffect} from "react";
//useParams para pegar os parâmetros da url
import { Link, useHistory, useParams } from "react-router-dom";
import "./style.css";
import api from "../../services/api";

export default function Profile(){
    //Renomerar para idUser
    const {id} = useParams();                   //ID da conta
    const {idUsuario} = useParams();  
    
    //Usuário inicial antes de criar
    const history = useHistory();
    const initBankAccount ={
      id: null,
      agencia: " ",
      banco: " ",
      nomeProprietario: " ",
      idUsuario: " ",
      saldo: 0
    }
    

    //setUser para att o usuário. Inicializa o usuário inicial passando o initUer
    const [bankAccount, setBankAccount] = useState(initBankAccount);

    const initUser ={name: "", email: "", idade: 0, empresa: "", temContabancaria: false} 
    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if (id) {       //Veriica se existe ID na url ao carregar o componente
            //Se n colocar a desestruturação vai dar erro pq no User do BD tem o atributo ID e no obj initUser n tem, então ocorre erro ao tentar setar o ID vindo do Banco no initUser (onde n foi criado esse atributo)
            api.get("/bankAccount_usuario/" + id).then(response => {
                //O "..." faz com q preencha os campos q achar e ignorar o campo q n encontrar (ID neste caso)
                setBankAccount(...response.data)
            })
        }

        //Recupera os dados do usuário dono da conta
        api.get("users/" + idUsuario).then(response => {
            setUser(...response.data);
        })
        
    }, []);

    function onSubmit(event){
        event.preventDefault();                     //Evita a parte de submissão para n recerregar a pág
        const method = bankAccount.id ? "put" : "post";         //Se existir ID é pq vai att algum user e se n existir, vai criar um novo
        //"/users/" + id : /users/${id}" :  
        const url = bankAccount.id ? "/bankAccount/" + bankAccount.id : "/bankAccount";
        bankAccount.nomeProprietario = user.name;
        bankAccount.idUsuario = idUsuario;

        api["put"]("users/" + idUsuario, user);         //Atualiza o User com temContabancaria = true

        api[method](url, bankAccount).then((response) => {    
            history.push("/");              //Vai para a tela após criar o user
        })
    }
    
    //Qnd fizer a mudança chama o event
    function onChange(event){
        const {name, value} = event.target;         
        setBankAccount({...bankAccount, [name]:value})
        setUser({...user, ["temContabancaria"]:true})
    }

    return (
        <div id="profile-container">
            <h1>Criar Conta Bancária</h1>

            <form onSubmit={onSubmit}>
                

                {
                    id?
                    (<div><strong>Agência:</strong>
                        <input name="agencia" onChange={onChange} value={bankAccount.agencia} readOnly></input></div>)
                    :
                    (<div><strong>Agência:</strong>
                        <input name="agencia" onChange={onChange} value={bankAccount.agencia} required></input></div>)
                }

                {
                    id?
                    (<div><strong>Banco:</strong>
                        <input onChange={onChange} name="banco" value={bankAccount.banco} readOnly></input></div>)
                    :
                    (<div><strong>Banco:</strong>
                        <input onChange={onChange} name="banco" value={bankAccount.banco} required></input></div>)

                }
                

                <strong>Saldo:</strong>
                <input type="number" name="saldo" onChange={onChange} value={bankAccount.saldo} required></input>

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