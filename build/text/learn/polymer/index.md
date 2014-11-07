Polymer
======

```
<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<script src="bower_components/platform/platform.js"></script>
		<link rel="import" href="bower_components/polymer/polymer.html">
	</head>
	<body>
		<polymer-element name="hello-tony" noscript>
		<template>
		<style>
		h1 {
		color: orange;
		}
		</style>
		<h1>Yo</h1>
		</template>
		</polymer-element>
		<hello-tony>hello</hello-tony>
	</body>
</html>
```