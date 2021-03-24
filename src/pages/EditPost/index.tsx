import React from "react";
import Container from '@material-ui/core/Container';


import { Link, useHistory, useLocation } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useStyles from './style'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import api from '../../services/'

interface CreateSouvenir {
    label: string
    password: string
}
interface StateProps {
    id: string
    label: string
    password: string
}

const Edit: React.FC = () => {

    const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = React.useState<boolean>(false);
    const { state } = useLocation<StateProps>();
    const schema = yup.object().shape({
        label: yup.string()
            .required('Informe o nome da lembrança!')
            .min(2, 'A lembrança deve conter mais que 2 digitos')
            .max(50, 'A lembraça deve conter menos que 50 digitos')
            .notOneOf(['admin', 'administrador'], 'Desculpa mas esse nome é resttrito!'),
        passowrd: yup.string()
            .required('Informe uma senha'),
    })
    const { register, handleSubmit, errors } = useForm<CreateSouvenir>({
        // resolver: yupResolver(schema)
    });

    const onSubmit = async (data: CreateSouvenir) => {
        console.log(data)
        const response = await api.put(`keep/${state?.id}`, data)
            .then((res) => {
                console.log("deu certo", res)
                history.push("/")
            })
            .catch((error) => {
                const { data } = error.response
                alert(data.message);
            })
    }

    const handleClickShowPassword = () => {
        setValues(!values);
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }


    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Box component="span" display="block" p={2} m={1} pl={4} mb={5} bgcolor="background.paper">
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '30ox' }}>
                                    Editar lembrança {state?.label}
                                </Typography>
                                <br />
                                <Link to="/" className={classes.link}>
                                    <ArrowBackIosIcon />
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '30px' }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="Lembrança"
                                    fullWidth
                                    size="small"
                                    name="label"
                                    inputRef={register}
                                    defaultValue={state?.label}
                                    placeholder="inserir Lembrança"
                                    helperText={errors?.label?.message}
                                    error={!!errors?.label?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="password"
                                    fullWidth
                                    size="small"
                                    name="password"
                                    inputRef={register}
                                    defaultValue={state?.password}
                                    placeholder="inserir password"
                                    helperText={errors?.password?.message}
                                    error={!!errors?.password?.message}
                                    type={values ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '30px' }}>
                            <Grid item xs={6} sm={6} md={6}>
                                <Link to="/" className={classes.link}>
                                    <Button
                                        fullWidth
                                        style={{ borderColor: '#0066A6', color: '#0066A6' }}
                                        size="small"
                                        variant="outlined">
                                        Cancelar
                                            </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <Button
                                    fullWidth
                                    style={{ borderColor: '#0066A6', color: '#0066A6' }}
                                    size="small"
                                    variant="outlined"
                                    type="submit">
                                    Salvar
                                            </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default Edit;