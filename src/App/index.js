import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { LayoutHome } from 'App/Layout';
import { Users, UserDetail } from 'App/Pages/Users';
import { Albums, AlbumDetail, AlbumDetailPhoto } from 'App/Pages/Album';
import PostDetail from 'App/Pages/Post';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <LayoutHome exact path="/" component={Users} />
        <LayoutHome exact path="/user/:id" component={UserDetail}/>
        <LayoutHome exact path="/user/:id/album" component={Albums} />
        <LayoutHome exact path="/user/:id/album/:albumId" component={AlbumDetail} />
        <LayoutHome exact path="/user/:id/photos/:photoId" component={AlbumDetailPhoto} />
        <LayoutHome exact path="/user/:id/post/:postId" component={PostDetail}/>
        <Redirect to="/" />
      </Switch>
    )
  }
}
