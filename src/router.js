import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Erro from "./pages/Erro";


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Home }/>
                <Route exact path="/home" component={ Home }/>
                <Route exact path="/login" component={ Login }/>
                <Route exact path="/register" component={ Register }/>
                <Route exact path="/terms" component={ Terms }/>
                <Route exact path="/*" component={ Erro }/>
            </Switch>
        </BrowserRouter>
    )
}
