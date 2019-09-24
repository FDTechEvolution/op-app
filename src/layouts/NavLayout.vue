<template>
    <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-item clickable tag="a" target="_self" href="http://localhost:8080/#/">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_self" href="http://localhost:8080/#/about">
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_self" href="http://localhost:8080/#/products">
          <q-item-section>
            <q-item-label>Products</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_self" href="http://localhost:8080/#/login">
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_self" href="http://localhost:8080/#/orders">
          <q-item-section>
            <q-item-label>Orders</q-item-label>
          </q-item-section>
        </q-item>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
