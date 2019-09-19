import React, {useState, Fragment} from 'react'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
      position: 'absolute',
      bottom: '20px',
      right: '20px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '300px'
    },
    dense: {
        marginTop: theme.spacing(2),
    },
  }));

const DialogCreateFile = ({id, createFolderOrFile, mainArray, path}) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const [file, setFile] = useState('CREATE_FOLDER')
    const [fileName, setFileName] = useState('')
    const [bodyText, setBodyText] = useState('')
    const classes = useStyles();

    function handleClickOpen() {
        setOpen(true);
    }

    const checkAllArrayAddFolder = (mainArrayClone) => {
        mainArrayClone.map(item => {
            if(id === item.id && value.length > 0) {
                item.childrenFolder = [...item.childrenFolder, {
                    id: new Date().getTime(),
                    visible: true, 
                    visibleMenu: false,
                    folder: value,
                    path: `${path}/${value}`,
                    childrenFolder: [],
                    fileThisFolder: []
                }]
            }
            if(item.childrenFolder.length > 0) checkAllArrayAddFolder(item.childrenFolder)
            return item
        }) 
    }

    const checkAllArrayAddFile = (mainArrayClone) => {
        mainArrayClone.map(item => {
            if(id === item.id) {
                    item.fileThisFolder = [...item.fileThisFolder, {
                    id: new Date().getTime(),
                    visible: true,
                    file: fileName,
                    body: bodyText
                }]
            }
            if(item.childrenFolder.length > 0) checkAllArrayAddFile(item.childrenFolder)
            return item
        })
    }

    const handleClose = (e, boolean) => {
        if(boolean === true) {
            const mainArrayClone = JSON.parse(JSON.stringify(mainArray))
            if(file === 'CREATE_FOLDER') checkAllArrayAddFolder(mainArrayClone)
            if(file === 'CREATE_FILE') checkAllArrayAddFile(mainArrayClone)
            createFolderOrFile(file, mainArrayClone)
        }
        setOpen(false);
    }

    return (
        <Fragment>
            <Fab color="primary" aria-label="add" 
            onClick={handleClickOpen} 
            className={`${classes.fab}`}>
                <AddIcon />
            </Fab>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='dialog'
            >
                <DialogTitle id="alert-dialog-title">{`${file === 'CREATE_FOLDER' ? 'Cоздание папки' : 'Создание файла'}`}</DialogTitle>
                <DialogContent className='dialog'>
                <FormControl onChange={e => setFile(e.target.value)} className={classes.formControl}>
                    <InputLabel htmlFor="uncontrolled-native">Выберите что хотите создать</InputLabel>
                    <NativeSelect
                        >
                        <option value="" />
                        <option value={'CREATE_FOLDER'}>Папку</option>
                        <option value={'CREATE_FILE'}>Файл</option>
                    </NativeSelect>
                </FormControl>

                <TextField
                    id="outlined-dense"
                    label="Имя файла"
                    className={clsx(classes.textField, classes.dense)}
                    style={file !== 'CREATE_FOLDER' ? {visibility: 'hidden', position: 'absolute'} : {display: 'inline-flex', position: 'relative'}}
                    margin="dense"
                    variant="outlined"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    inputProps={{
                        maxLength: 15,
                    }}
                />
                <TextField
                    id="outlined-dense"
                    label="Имя файла"
                    className={clsx(classes.textField, classes.dense)}
                    style={file !== 'CREATE_FILE' ? {visibility: 'hidden', position: 'absolute'} : {display: 'inline-flex', position: 'relative'}}
                    margin="dense"
                    variant="outlined"
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
                    inputProps={{
                        maxLength: 15,
                    }}
                />

                <TextField
                    id="outlined-dense"
                    label="текст файла"
                    className={clsx(classes.textField, classes.dense)}
                    style={file !== 'CREATE_FILE' ? {visibility: 'hidden', position: 'absolute'} : {display: 'inline-flex', position: 'relative'}}
                    margin="dense"
                    variant="outlined"
                    value={bodyText}
                    onChange={e => setBodyText(e.target.value)}
                    inputProps={{
                        maxLength: 35,
                    }}
                />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Выход
                    </Button>
                    <Button onClick={(e) => handleClose(e, true)} color="primary" autoFocus>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        mainArray: state.folders,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFolderOrFile: (file, array) => {
            dispatch({
                type: file,
                array
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogCreateFile)