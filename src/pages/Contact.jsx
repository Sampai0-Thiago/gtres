import { useState } from 'react';
import './Contact.css'

const initialForm = {
    cep: '',
    street:'',
    neighborhood: '',
    state: '',
    city:'',
    number:'',
    message:''
}

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState({type:'', message: ''});
    
    
    async function searchCep() {
        const cleanCep = form.cep.replace(/\D/g, '');
        if(cleanCep.length !==8) {
            setStatus({type:'erro', message:'digite um cep válido!'});
            return;
        }
        
        try{
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            if(!response.ok) throw new Error('Falha na busca do CEP.')
            const address = await response.json();
            if(address.erro) throw new erro('CEP não encontrado.')
            
            setForm((current) => ({
                ...current,
                cep: cleanCep,
                street: address.logradouro || '',
                neigborhood: address.bairro || '',
                state: address.uf || '',
                city: address.localidade || ''
            }));

            setStatus({type: 'success', message: e.message});   

        }catch(e){
            setStatus({type: 'erro', message: e.message});
        }
    }

    return (
        <section className="contact-page">
            <span className="section-label">Fale com a gente</span>
            <h1>Entre em contato</h1>
            <p className="page-intro">Consulte o CEP para completar seu endereço e escolha uma cidade carregada pela API do IBGE.</p>
            <form className="contact-form">
                <div className="form-section">
                    <h2>Endereço</h2>
                    <div className="form-grid">
                        <label>CEP
                            <div className="cep-field">
                                <input 
                                    name="cep" 
                                    inputMode="numeric" 
                                    placeholder="000-000" 
                                    value={form.cep}
                                    onChange={(evento) => 
                                        setForm((current)=>
                                        ({...current, cep: evento.target.value}))}
                                />
                                <button onClick={searchCep} type="button">
                                </button>
                            </div>
                        </label>
                        <label>Estado
                            <select 
                                name="state" 
                                value={form.state}
                            >
                            </select>
                        </label>
                        <label>Cidade
                            <select 
                                name="city" 
                            >
                            </select>
                        </label>
                        <label>Rua
                            <input 
                                name="street" 
                                value={form.street}
                                placeholder="Nome da rua" 
                            />
                        </label>
                        <label>Número
                            <input 
                                name="number" 
                                placeholder="123" 
                            />
                        </label>
                        <label>Bairro
                            <input 
                                name="neighborhood" 
                                value={form.neigborhood}
                                placeholder="Seu bairro" 
                            />
                        </label>
                    </div>
                </div>
                <label>Mensagem
                    <textarea 
                        name="message" 
                        rows="5" 
                        placeholder="Como podemos ajudar?" 
                    />
                </label>
                <button className="submit-button" type="submit">Enviar mensagem</button>
            </form>
        </section>
    );
}

