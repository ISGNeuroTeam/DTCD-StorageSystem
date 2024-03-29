# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [UNRELEASED]

### Added

- reset system hook

### Changed

- replace tokenStorage to SessionModule
- getting and setting tokens and default tokens from plugin config
- added the third argument in addRecord/putRecord methods of TokenModule
- added try-catch statement in method of addition records from plugin config

## [0.9.0]

### Fixed

- bug with undefined value in getRecord method

## [0.8.0]

### Added

- state default values to TokenModule

## [0.7.0]

### Added

- module scopes
- sessionModule scopes
- default values in TokenModule

### Changed

- persistModule is replaced by the browserModule
- refactoring TokenModule

## [0.6.0]

### Added

- persist IndexedDB browser module

## [0.5.0]

### Added

- version of core systems for adapters

### Changed

- build process in order to make directory name with current version of pluing

## [0.4.0]

### Added

- token module
- set / getPluginConfig methods
- token module state dumping

### Changed

- sdk version
- plugin build mechanism
- plugin inner architecture
  - remove `Vue` and `Vuex` dependencies
  - redesigned module system

## [0.3.0] - 2021-02-16

### Removed

- the `storage` argument from public methods
- private method `_checkStorageType()`

## [0.2.0] - 2021-02-11

### Changed

- code source directory name to DTCD-StorageSystem
- downloading DTCD-SDK from [storage](http://storage.dev.isgneuro.com)
- paths in source files to DTCD-SDK
- [Makefile](Makefile) to current project structure

## [0.1.0] - 2021-02-09

### Added

- base plugin functionality
