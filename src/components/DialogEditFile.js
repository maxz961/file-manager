import React, {useState, Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';


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

const DialogEditFile = ({openEdit, idDialogFile, handleEditDialogClose, mainArray, textFile, textBody, dispatchEditFile}) => {
    const [open, setOpen] = useState(openEdit)
    const [fileName, setFileName] = useState('')
    const [bodyText, setBodyText] = useState('')
    const classes = useStyles();

    useEffect(() => {
        setOpen(openEdit)
        setFileName(textFile)
        setBodyText(textBody)
    },[openEdit, textFile, textBody])

    const checkAllArrayAddFile = (mainArrayClone) => {
        mainArrayClone.map(item => {
                item.fileThisFolder.map(file => {
                    if(idDialogFile === file.id) {
                        file.file = fileName
                        file.body = bodyText
                    }
                    return file
                })
            if(item.childrenFolder.length > 0) checkAllArrayAddFile(item.childrenFolder)
            return item
        })
    }

    const handleClose = (e, boolean) => {
        handleEditDialogClose()
        if(boolean === true) {
            const mainArrayClone = JSON.parse(JSON.stringify(mainArray))
            checkAllArrayAddFile(mainArrayClone)
            dispatchEditFile(mainArrayClone)
        }
        setOpen(false);
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='dialog'
            >
                <DialogTitle id="alert-dialog-title">{`Редактирование файла ${idDialogFile}`}</DialogTitle>
                <DialogContent className='dialog'>
                <TextField
                    id="outlined-dense"
                    label="Имя файла"
                    className={clsx(classes.textField, classes.dense)}
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
        mainArray: state.folders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFolderOrFile: (file, array) => {
            dispatch({
                type: file,
                array
            })
        },
        dispatchEditFile: (array) => {
            dispatch({
                type: 'EDIT_FILE',
                array
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogEditFile)