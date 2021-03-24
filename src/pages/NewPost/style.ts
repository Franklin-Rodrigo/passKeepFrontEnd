import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=>({
    form : {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    link:{
        textDecorationLine: 'none',
        color: "black",
        marginBottom: "30px",
    },
    container : {
        paddingTop : theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}))

export default useStyles;