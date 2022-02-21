# sql.js-httpvfs-rs

A _very_ minimal and slightly ridiculous-sounding Rust wrapper around [sql.js-httpvfs](https://github.com/phiresky/sql.js-httpvfs), for use in stuff like WASM web applications.

**Note**: This is **not** intended for any serious or production use, at least for now. It's just quick wasm-bindgen bindings to be called by a Rust application.

The driving force for this was for work in some small projects for fun like [opal](https://github.com/ClementTsang/opal).

## Thanks

- [sql.js-httpvfs](https://github.com/phiresky/sql.js-httpvfs) for creating this in the first place.
- Approach to writing this wrapper was inspired by [Material Yew](https://github.com/hamza1311/material-yew).
