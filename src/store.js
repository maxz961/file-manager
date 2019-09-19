import { createStore } from 'redux';

const initialState = {
    folders:[
        {   id: 0,
            visible: false,
            visibleMenu: true,
            active: false,
            folder:'home',
            path: '/home',
            childrenFolder:[{   
                id: 1,
                visible: true,
                visibleMenu: false,
                active: false,
                folder: 'fooled1',
                path: '/home/fooled1',
                childrenFolder: [
                    {   id: 2,
                        visible: false,
                        visibleMenu: false,
                        active: false,
                        folder: 'childrenFolder1',
                        path: '/home/fooled1/childrenFolder1',
                        childrenFolder: [
                            {   id: 4,
                                visible: false,
                                visibleMenu: false,
                                active: false,
                                folder: 'CCC',
                                path: '/home/fooled1/childrenFolder1/CCC',
                                childrenFolder: [],
                                fileThisFolder: [
                                    {
                                        id: 333,
                                        visible: false,
                                        active: false,
                                        file: 'fileText333',
                                        body: 'qweqweqweqwe'
                                    }
                                ]
                            }
                        ],
                        fileThisFolder: [{
                            id: 444,
                            visible: false,
                            active: false,
                            file: 'fileText444',
                            body: 'qweqweqweqwe'
                        }]
                    },
                    {   id: 3,
                        visible: false,
                        visibleMenu: false,
                        active: false,
                        folder: 'childrenFolder',
                        path: '/home/fooled1/childrenFolder',
                        childrenFolder: [],
                        fileThisFolder: []
                    },
                ],
                fileThisFolder: [
                    {
                        id: 222,
                        visible: false,
                        active: false,
                        file: 'fileText22',
                        body: 'qweqweqweqwe'
                    }
                ]
            },
            {
                id: 6,
                visible: true,
                visibleMenu: false,
                active: false,
                folder: 'fooled2',
                path: '/home/fooled2',
                childrenFolder: [
                    {
                        id: 7,
                        visible: false,
                        visibleMenu: false,
                        active: false,
                        folder: 'fooled3',
                        path: '/home/fooled2/fooled3',
                        childrenFolder: [],
                        fileThisFolder: []
                    }
                ],
                fileThisFolder: []
            },
        ],
        fileThisFolder: [{
            id: 100,
            visible: true,
            active: false,
            file: 'fileText000',
            body: 'qweqweqweqwe'
        }],
    },
    ],
    goToBackId: null,
}

function navAction(state = initialState, action) {
    switch(action.type) {

        case 'NEXT_FOLDER': {
            return {
                ...state,
                folders: action.mainArrayClone,
                goToBackId: action.oldId
            }
        }

        case 'LEVEL_UP': {
            return {
                ...state,
                folders: action.array,
                goToBackId: action.oldId
            }
        }

        case 'CREATE_FOLDER': {
            return {
                ...state,
                folders: action.array
            }
        }

        case 'CREATE_FILE': {
            return {
                ...state,
                folders: action.array
            }
        }

        case 'SEARCH_FOLDER': {
            return {
                ...state,
                folders: action.array,
                goToBackId: action.oldId
            }
        }

        case 'FOLDER_ACTIVE': {
            return {
                ...state,
                folders: action.array
            }
        }

        case 'EDIT_FILE': {
            return {
                ...state,
                folders: action.array
            }
        }

        case 'FOLDER_GOTOBACK': {
            return {
                ...state,
                folders: action.array,
                goToBackId: action.oldId
            }
        }

        default: 
            return state
    }
}

const store = createStore(navAction)
export default store