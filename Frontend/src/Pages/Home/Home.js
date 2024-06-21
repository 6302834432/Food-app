import React, { useEffect, useReducer } from 'react';
import { getAll, getAllByTag, getAllTags, search } from '../../Services/Foodservice';
import Item from '../../Components/Item/Item';
import { useParams } from 'react-router-dom';
import Search from '../../Components/Search/Search';
import Tags from '../../Components/Tags/Tags';
import NotFound from '../../Components/NotFound/NotFound';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'FOODS_LOADED':
            return { ...state, foods: action.payload };
        case 'TAGS_LOADED':
            return { ...state, tags: action.payload }; 
        default:
            return state;
    }
};

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, tags } = state;
    const { searchTerm, tag } = useParams();

    useEffect(() => {
        const loadFoods = async () => {
            let foodsData;
            if (tag) {
                foodsData = await getAllByTag(tag);
            } else if (searchTerm) {
                foodsData = await search(searchTerm);
            } else {
                foodsData = await getAll();
            }
            dispatch({ type: 'FOODS_LOADED', payload: foodsData });
        };

        const loadTags = async () => {
            const tagsData = await getAllTags();
            dispatch({ type: 'TAGS_LOADED', payload: tagsData });
        };

        loadTags();
        loadFoods();
    }, [searchTerm, tag]);
    return (
        <>
            <Search />
            <Tags tags={tags} />
            {foods.length===0 && <NotFound/>}
            <Item foods={foods} />
        </>
    );
};

export default Home;
