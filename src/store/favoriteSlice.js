import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        allFavorite: [],
        favoriteTotal: 0
    },
    reducers: {
        updateFavoriteAction: (state, action) => {
            console.log(action.payload);
            let copyFavorite = [...state.allFavorite];

            // LOGIKA
            // FIND_INDEX === DUPLIKATI
            let findeIndex = null;

            copyFavorite.find((item,index) => {
                if(item.id === action.payload.id){
                    findeIndex = index;
                    return;
                }
            })

            if(findeIndex === null){
                copyFavorite.push(action.payload)
                state.favoriteTotal++;
            }else{
                copyFavorite.splice(findeIndex,1);
                state.favoriteTotal--;
            }

            state.allFavorite = copyFavorite

        }
    }
})

export const {updateFavoriteAction} = favoriteSlice.actions;
export default favoriteSlice.reducer;