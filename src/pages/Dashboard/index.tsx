import React, { useEffect, useState } from 'react';
import api from '../../services'
import useStyles from './style';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { Button, Grid, IconButton, InputAdornment, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import ModalForDelete from './modals/index'
import { Link } from 'react-router-dom'
interface PostList {
    id: string
    label: string
    password: string
}

const Feed: React.FC = () => {

    const classes = useStyles();
    const [feed, setFeed] = useState<PostList[]>([])
    const [values, setValues] = useState<boolean>(false);
    const [isOpenDelete, setIsOpenDelete] = React.useState(false);
    const [forDelete, setForDelete] = React.useState<PostList | undefined>(undefined);


    const getFeed = async () => {
        const response = await api.get('keep/');
        console.log(response);
        setFeed(response.data);
    }

    const handleClickShowPassword = () => {
        setValues(!values);
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handleOpenDelete = () => {
        setIsOpenDelete(true);
    }
    const handleCloseDelete = () => {
        setIsOpenDelete(false);
    }
    useEffect(() => {

        getFeed();
    }, [])

    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Box component="span" display="block" p={2} m={1} pl={4} mb={5} bgcolor="background.paper">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '30px' }}>
                                Bem Vindo
                            </Typography>
                            <br />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>

                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <Autocomplete
                                options={feed}
                                size="small"
                                fullWidth
                                getOptionLabel={(option) => option?.label}

                                renderInput={(params) => <TextField {...params} label="pesquisar a lembrança" />

                                }
                            />
                        </Grid>
                    </Grid>
                </Box>

                {feed.length !== 0 && feed !== null ? feed.map((reminder) => (
                    <Grid container xs={12} sm={12} md={12} spacing={2} style={{ paddingBottom: '5px', paddingTop: '10px' }} >
                        <Grid item xs={10} sm={10} md={10}>
                            <Typography >
                                {reminder?.label}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} style={{ textAlign: 'right' }}>
                            <Link to={{
                                pathname: "/editpost",
                                state: {
                                    id: reminder?.id,
                                    label: reminder?.label,
                                    password: reminder?.password,
                                }
                            }} className={classes.link}>
                                <EditIcon />
                            </Link>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} style={{ textAlign: 'right' }}>
                            <DeleteIcon onClick={() => {
                                setForDelete(reminder)
                                handleOpenDelete()
                            }} />
                        </Grid>
                        <Grid item xs={10} sm={10} md={10}>

                            <TextField
                                fullWidth
                                size="small"
                                name="password"
                                defaultValue={reminder?.password}
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
                        <Grid item xs={2} sm={2} md={2} style={{ textAlign: 'right' }}>
                            <Button
                                fullWidth
                                style={{ borderColor: '#0066A6', color: '#0066A6' }}
                                size="small"
                                onClick={() => { navigator.clipboard.writeText(reminder.password) }}
                            >
                                Copiar
                                </Button>
                        </Grid>

                    </Grid>

                ))
                    : <></>
                }
                <Grid container xs={12} sm={12} md={12} spacing={2} style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Link to="/newpost" className={classes.link}>
                            <Button
                                fullWidth
                                style={{ borderColor: '#0066A6', color: '#0066A6' }}
                                size="small"
                                variant="outlined">
                                <AddIcon /> Nova Lembraça
                            </Button>
                        </Link>
                    </Grid>

                </Grid>
            </Container>
            <ModalForDelete isOpenDelete={isOpenDelete} handleCloseDelete={handleCloseDelete} getList={getFeed} state={forDelete} />
        </>
    )
}

export default Feed;