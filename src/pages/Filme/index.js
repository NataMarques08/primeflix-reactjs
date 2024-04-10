import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api';
import './filme-info.css';


//http://localhost:3000/filme/1011985

function Filme(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme,setFilmes] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"8d3546987bc0561dc355eb43a7457a2e",
                    language: "pt-br"
                }
            })
            .then((response)=>{
                 setFilmes(response.data)  
                 setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/",{replace:true});
                alert("Filme não encontrado");
                return;
            })
        }

        loadFilme();
        return(
            console.log("COMPONENTE FOI DESMONTADO")
        );
    },[navigate,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmeSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmeSalvos.some((filmeSalvo)=>filmeSalvo.id === filme.id);

        if(hasFilme){
            alert("FILME JÁ ESTÁ NA LISTA");
            return;
        }
        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix",JSON.stringify(filmeSalvos))
        alert("FILME SALVO COM SUCESSO");

    }


    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title}`} target="blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;