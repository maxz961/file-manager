import React, {Fragment, useState} from 'react'
import { connect } from 'react-redux'
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import DialogCreateFile from './DialogCreateFile'
import DialogEditFile from './DialogEditFile'


const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
  }));

const MainFolder = ({
    folders, 
    dispatchNextFolder, 
    dispatchClickLevelUp, 
    oldFolders, 
    oldId, 
    fileThisFolder, 
    mainArray, 
    oldFileId, 
    visibleMenu, 
    path, 
    dispatchSearchFolder, 
    dispatchChangeActiveFolder,
    dispatchGoToBackFolderOpen,
    goToBackId}) => {
    const classes = useStyles();
    const [value, setValue] = useState(path)
    const [openEdit, setOpenEdit] = useState(false)
    const [idDialogFile, setIdDialogFile] = useState(null)
    const [textFile, setTextFile] = useState('')
    const [textBody, setTextBody] = useState('')

    const goToBackFolder = () => {
        if(goToBackId !== null) {
            const mainArrayClone = JSON.parse(JSON.stringify(mainArray))
            const checkAllArrayGoToBackFolderHide = (mainArrayClone, boolean) => {
                mainArrayClone.map(item => {
                    item.visible = boolean
                    item.visibleMenu = boolean
                    item.childrenFolder.map(item => item.visible = boolean)
                    item.fileThisFolder.map(file => file.visible = boolean)
                    if(item.childrenFolder.length > 0) checkAllArrayGoToBackFolderHide(item.childrenFolder)
                    return item
                })
            }
            const checkAllArrayGoToBackFolderOpen = (mainArrayClone, boolean) => {
                mainArrayClone.map(item => {
                if(goToBackId === item.id) {
                    item.visible = boolean
                    item.visibleMenu = !boolean
                    item.childrenFolder.map(item => item.visible = !boolean)
                    item.fileThisFolder.map(file => file.visible = !boolean)
                }
                if(item.childrenFolder.length > 0) checkAllArrayGoToBackFolderOpen(item.childrenFolder)
                return item
            })
            }
            checkAllArrayGoToBackFolderHide(mainArrayClone, false)
            checkAllArrayGoToBackFolderOpen(mainArrayClone, false)
            dispatchGoToBackFolderOpen(mainArrayClone, oldId)
        }
    }
 
    const changeActiveFolderAndFile = (id, oldId) => {
        const mainArrayClone = JSON.parse(JSON.stringify(mainArray))
        const checkAllArrActiveFolder = (mainArrayClone, id, oldId, boolean) => {
            mainArrayClone.map(item => {
                if(oldId === item.id) {
                    item.childrenFolder.map(item => {
                        if(id === item.id) {
                            item.active = !boolean
                            return item
                        }
                        item.active = boolean
                        return item 
                    })

                    item.fileThisFolder.map(item => {
                        if(id === item.id) {
                            item.active = !boolean
                            return item
                        }
                        item.active = boolean
                        return item 
                    })
                    return item
                }
                item.active = boolean
                if(item.childrenFolder.length > 0) checkAllArrActiveFolder(item.childrenFolder, id, oldId, boolean)
                return item
            })
        }
        checkAllArrActiveFolder(mainArrayClone, id, oldId, false)
        dispatchChangeActiveFolder(mainArrayClone)
    }

    const checkAllArrayNextFolder = (id, boolean, mainArrayClone, oldId) => {
        mainArrayClone.map(item => {
            if(oldId === item.id) {
                item.visibleMenu = boolean
                item.childrenFolder.map(item => {
                    item.visible = boolean
                    item.active = boolean
                    return item
                })
                item.fileThisFolder.map(file => {
                    file.visible = boolean
                    file.active = boolean
                    return file
                })
            }
            if(id === item.id) {
                item.visibleMenu = !boolean
                item.childrenFolder.map(item => item.visible = !boolean)
                item.fileThisFolder.map(item => item.visible = !boolean)
            }
            if(item.childrenFolder.length > 0) checkAllArrayNextFolder(id, boolean, item.childrenFolder, oldId)
            return item
        })
    }

    const handleNextFolder = (id, boolean) => {
        const mainArrayClone = JSON.parse(JSON.stringify(mainArray))
        checkAllArrayNextFolder(id, boolean, mainArrayClone, oldId)
        dispatchNextFolder(mainArrayClone, oldId)
    }

    const checkAllArrayLevelUp = (mainArrayClone, boolean) => {
        mainArrayClone.map(item => {
            if(oldFileId === item.id) {
                item.visibleMenu = !boolean
                item.childrenFolder.map(item => {
                    if(oldId === item.id) {
                        item.visibleMenu = boolean
                        item.childrenFolder.map(item => {
                            item.visible = boolean
                            item.active = boolean
                            return item
                        })
                        item.fileThisFolder.map(file => {
                            file.visible = boolean
                            file.active = boolean
                            return file
                        })
                    }
                    item.visible = !boolean
                    return item
                })
                item.fileThisFolder.map(file => file.visible = !boolean) 
            }
            if(item.childrenFolder.length > 0) checkAllArrayLevelUp(item.childrenFolder, boolean)
            return item
        })
    }

    const clickLevelUp = (boolean) => {
        const mainArrayClone = JSON.parse(JSON.stringify(mainArray))
        checkAllArrayLevelUp(mainArrayClone, boolean)
        dispatchClickLevelUp(mainArrayClone, oldId)
    }

    const clickSearchFolder = (boolean) => {
        if(value.length >= 5) {
            let check = false
            const mainArrayClone = JSON.parse(JSON.stringify(mainArray))
            const checkAllArrayFolderHide = (mainArrayClone) => {
                mainArrayClone.map(item => {
                    item.visible = boolean
                    item.visibleMenu = boolean
                    item.childrenFolder.map(item => item.visible = boolean)
                    item.fileThisFolder.map(file => file.visible = boolean)
                    if(item.childrenFolder.length > 0) checkAllArrayFolderHide(item.childrenFolder)
                    return item
                })
            }
            const checkAllArraySearchFolder = (mainArrayClone) => {
                mainArrayClone.map(item => {
                    if(item.path === value) {
                        check = true
                        item.visible = boolean
                        item.visibleMenu = !boolean
                        item.childrenFolder.map(item => item.visible = !boolean)
                        item.fileThisFolder.map(file => file.visible = !boolean)
                    }
                    if(item.childrenFolder.length > 0) checkAllArraySearchFolder(item.childrenFolder)
                    return item
                })
                
            }
            checkAllArrayFolderHide(mainArrayClone)
            checkAllArraySearchFolder(mainArrayClone)
            if(check) dispatchSearchFolder(mainArrayClone, oldId)
        }
        setValue(path)
    }

    const handleEditDialogClose = () => {
        setOpenEdit(false)
    }

    const handleEditDialog = (boolean, id, textFile, textBody) => {
        setOpenEdit(boolean)
        setIdDialogFile(id)
        setTextFile(textFile)
        setTextBody(textBody)
    }

    return (
        <Fragment>
        <div className={`Container__wrapper ${!visibleMenu && 'hiden'}`}>
            <div className={`Container__nav ${!visibleMenu && 'hiden'}`}>
                <div onClick={() => clickLevelUp(false)}>На уровень верх</div>
                <div onClick={() => goToBackFolder()}>Назад</div>
            </div>
            <div id={`${path}`} className={`Container__input ${!visibleMenu && 'hiden'}`}>
                <TextField
                    id={`${path}`}
                    className={classes.textField}
                    margin="normal"
                    value={value}
                    variant="outlined"
                    onChange={e => setValue(e.target.value)}
                    onKeyUp={e => e.keyCode === 13 && clickSearchFolder(false)}
                />
            </div>
            <div className="Container__folder">
                {folders.map(item => {
                    return (
                        <Fragment key={item.id}>
                            <div key={item.id}
                            onClick={() => changeActiveFolderAndFile(item.id , oldId)} 
                            onDoubleClick={() => handleNextFolder(item.id, false)} 
                            className={`${!item.visible && 'hiden'} folder ${item.active && 'active'}`}>
                                <div className='folder__icon'>
                                    <FolderIcon />
                                </div>
                                <div className='folder__text'>
                                    {item.folder}
                                </div>
                            </div>
                        </Fragment>
                    )
                })}
                {
                   fileThisFolder && fileThisFolder.map(file => {
                            return (
                            <div key={file.id}
                            onClick={() => changeActiveFolderAndFile(file.id , oldId)}
                            onDoubleClick={() => handleEditDialog(true, file.id , file.file, file.body)} 
                            className={`${!file.visible && 'hiden'} folder ${file.active && 'active'}`}>
                                <div className='folder__icon '>
                                    <DescriptionIcon />
                                </div>
                                <div className='folder__text'>
                                    {file.file}
                                </div>
                            </div>)
                    })
                }
            </div>
            <div className={`${!visibleMenu && 'hiden'}`}>
                <DialogCreateFile id={oldId} path={path} />
            </div>
            <DialogEditFile 
            openEdit={openEdit} 
            idDialogFile={idDialogFile} 
            handleEditDialogClose={handleEditDialogClose}
            textFile={textFile}
            textBody={textBody}
            />
        </div>
        {folders.map(item => {
           return ( 
           <MainFolder
            key={item.id} 
            folders={item.childrenFolder}
            oldFolders={folders}
            mainArray={mainArray} 
            dispatchNextFolder={dispatchNextFolder}
            dispatchClickLevelUp={dispatchClickLevelUp}
            oldId={item.id}
            oldFileId={oldId}
            fileThisFolder={item.fileThisFolder}
            visibleMenu={item.visibleMenu}
            path={item.path}
            dispatchSearchFolder={dispatchSearchFolder}
            dispatchChangeActiveFolder={dispatchChangeActiveFolder}
            dispatchGoToBackFolderOpen={dispatchGoToBackFolderOpen}
            goToBackId={goToBackId}
           /> )
        })}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        folders: state.folders,
        oldFolders: state.folders,
        mainArray: state.folders,
        goToBackId: state.goToBackId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchNextFolder: (mainArrayClone, oldId) => {
            dispatch({
                type: 'NEXT_FOLDER',
                mainArrayClone,
                oldId
            })
        },
        dispatchClickLevelUp: (array, oldId) => {
            dispatch({
              type: 'LEVEL_UP',
              array,
              oldId
          })
        },
        dispatchSearchFolder: (array, oldId) => {
            dispatch({
                type: 'SEARCH_FOLDER',
                array,
                oldId
            })
        },
        dispatchChangeActiveFolder: (array) => {
            dispatch({
                type: 'FOLDER_ACTIVE',
                array
            })
        },
        dispatchGoToBackFolderOpen: (array, oldId) => {
            dispatch({
                type: 'FOLDER_GOTOBACK',
                array,
                oldId
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFolder)