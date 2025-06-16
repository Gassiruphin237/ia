import React, { useState } from 'react';
import { showError, showSuccess } from '../../utils/showToast';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { login } from '../../services/AuthService';

import Alert from '../../components/Alert/Alert';
import back from '../../assets/back.jpg';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const change = () => {
        setShow(true)
    }
    const handleClick = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            showError("Veuillez remplir tous les champs !");
            return;
        }

        setLoading(true);
        console.log(email, password)
        try {
            const data = await login(email, password);
            showSuccess(data.message || `Bienvenue ${email} !`);
            console.log(data)
            localStorage.setItem('token', data.token);
        } catch (error) {
            showError(error.message);
            console.log(error.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <Alert />
            <div className="row">
                <div className="col-md-6" id='img' style={{ padding: 0 }}>
                    <img src={back} alt="background" style={{ height: '100vh' }} />
                </div>
                <div className="col-md-6">
                    <form>
                        <div className="title" style={{ marginBottom: '2rem', color: '#0038FD', lineHeight: '1.8' }}>
                            <h5>BIENVENUE SUR VOTRE APPLICATION DE NORMALISATION DE FACTURES</h5>
                        </div>
                        <CustomInput
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <CustomInput
                            label="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                        />
                        {show ? <CustomButton
                            label={loading ? "Connexion ..." : "Se connecter"}
                            onClick={handleClick}
                            disabled={loading}
                        /> : "text"}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
