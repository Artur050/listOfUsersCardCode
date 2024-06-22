import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { favouritesActions } from '../store/rickAndMortyApi/rickAndMorty.slice';

const actions = {
    ...favouritesActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}