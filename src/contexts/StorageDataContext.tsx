import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, ReactNode, useState } from 'react';

interface IStorageDataProvider {
  children: ReactNode;
}

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

interface IStorageDataContext {
  searchListData: LoginDataProps[];
  data: LoginDataProps[];
  loadData: () => void;
  handleFilterLoginData: (search: string) => void;
}

const StorageDataContext = createContext({} as IStorageDataContext);

function StorageDataProvider({ children }: IStorageDataProvider) {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  async function loadData() {
    const passwords = await AsyncStorage.getItem('@passmanager:logins');
    const passwordsParsed = passwords ? JSON.parse(passwords) : [];
    setSearchListData(passwordsParsed);
    setData(passwordsParsed);
  }

  function handleFilterLoginData(search: string) {
    if (search === '') return setSearchListData(data);

    const dataSearch = data.filter(item => item.title.includes(search));

    if (!dataSearch) return;

    setSearchListData(dataSearch)
  }

  return (
    <StorageDataContext.Provider value={{ data, loadData, searchListData, handleFilterLoginData }}>
      {children}
    </StorageDataContext.Provider>
  );
}

function useStorageData() {
  const context = useContext(StorageDataContext);

  return context;
}

export { StorageDataProvider, useStorageData };