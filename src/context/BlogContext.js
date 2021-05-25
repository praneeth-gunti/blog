import createDataContext from './createDataContext';


const blogReducer = (state, action) =>{
    switch(action.type){
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);

        case 'add_blogpost':
            return [...state, { id: Math.floor(Math.random()*99999), title: action.payload.title, content: action.payload.content}];

        case 'edit_blogpost':
            return state.map((blogpost)=>{
                return blogpost.id === action.payload.id ? action.payload : blogPost;
            })
        
        default: 
            return state;
    }
};

const addBlogPost = (dispatch) =>{
    return (title, content, callback) =>{
        dispatch({type: 'add_blogpost', payload:{title, content}});
        if(callback){
            callback();
        }
    }
};

const deleteBlogPost = (dispatch) => {
    return (id) =>{
        dispatch({type: 'delete_blogpost', payload:id})
    }
}

const editBlogPost = (dispatch) => {
    return (title, content, id, callback) => {
        dispatch({type:'edit_blogpost', payload:{id : id, title: title, content: content} });
        if(callback){
            callback();
        }
    };
}

export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost, deleteBlogPost, editBlogPost}, [{title:'Test Post', content:'Test Content', id:1}]);
