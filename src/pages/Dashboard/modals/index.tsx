import React from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './style'
import api from '../../../services/'
import { useHistory } from 'react-router-dom'

interface StateProps {
    id: string
    label: string
    password: string
}


const Delete: React.FC<{ isOpenDelete: boolean, handleCloseDelete: VoidFunction, state: StateProps | undefined, getList: VoidFunction }> = ({ getList, isOpenDelete, handleCloseDelete, state }) => {

    const classes = useStyles();

    const deleteReminder = async () => {
        const response = await api.delete(`keep/${state?.id}`)
            .then((res) => {
                console.log(res)
                getList();
                handleCloseDelete();
            })
            .catch((error) => {
                const { data } = error.response
                alert(data.message);
            })
        console.log(response)



    }

    return (
        <Modal
            className={classes.modal}
            open={isOpenDelete}

            onClose={handleCloseDelete}
        >
            <Fade in={isOpenDelete}>

                <Box component="span" display="block" p={2} m={1} pl={4} width="781px" minHeight="400px" bgcolor="background.paper">

                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} md={12} >
                            <Typography variant="h5">
                                Exclusão da lembrança "{state?.label}"
                                    </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle2" style={{ paddingBottom: '5px', paddingTop: '34px' }}>
                        * Ao deletar essa lembrança não será possível desfazer essa ação.
                        </Typography>
                    <Typography variant="subtitle2" style={{ paddingBottom: '5px', paddingTop: '34px', color: 'red' }}>
                        Você têm certeza que deseja deletar?
                        </Typography>


                    <Grid container xs={12} sm={12} md={12} spacing={2} style={{ paddingTop: '34px', paddingBottom: "24px" }}>
                        <Grid item xs={6} sm={6} md={6} >

                            <Button
                                fullWidth
                                style={{ borderColor: '#0066A6', color: '#0066A6' }}
                                onClick={handleCloseDelete}
                                variant="outlined"
                                size="small"

                            >
                                cancelar
                                        </Button>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} >
                            <Button
                                fullWidth
                                style={{ borderColor: '#EB4545', color: 'white', backgroundColor: '#EB4545' }}
                                variant="contained"
                                size="small"
                                onClick={() => deleteReminder()}
                            >
                                Confirmar exclusão da lembrança
                                        </Button>
                        </Grid>
                    </Grid>

                </Box>

            </Fade>
        </Modal>
    );
};
export default Delete;