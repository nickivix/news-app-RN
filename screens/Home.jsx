import { TouchableOpacity, Alert, StatusBar, FlatList, View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { Post } from '../components/Post';

export const HomeScreen = ({navigation})=> {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState()

  const fetchPosts = () => {
    setIsLoading(true)
    axios
      .get('https://64380c20894c9029e8cd3751.mockapi.io/articles')
      .then(({ data }) => {
        setItems(data)
      })
      .catch(err => {
        console.log(err)
        Alert.alert('Error', 'Error while trying to get articles')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  React.useEffect(fetchPosts, [])

  if (isLoading) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 15 }}>Loading ...</Text>
    </View>
  }

  return (
    <View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('FullPost', {id: item.id, title: item.title})}>
            <Post
              title={item.title}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
