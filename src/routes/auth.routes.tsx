import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from '../pages/Dashboard'
import NewPost from '../pages/NewPost'
import EditPost from '../pages/EditPost'


const AuthRoutes: React.FC = () =>{

    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
           <Route path="/newpost" exact component={NewPost} />
            <Route path="/editpost" exact component={EditPost} /> 


        </Switch>
    )
}

export default AuthRoutes;