# legacy-uploads

Drop the legacy WordPress media here, preserving the original
`YYYY/MM/filename` structure, e.g.:

```
public/legacy-uploads/2013/07/Robot_Front.jpg
public/legacy-uploads/2013/11/quad.jpg
public/legacy-uploads/2013/07/Remote-Robot.txt
```

The migrated posts and the Files page reference these paths. Until the files
are added, images degrade gracefully (they hide) and download links 404.

The complete list of expected assets (50 files) is in
[`../../legacy/uploads-manifest.txt`](../../legacy/uploads-manifest.txt).

Source: the `wp_content/uploads` folder of the old xile.us WordPress install on
GoDaddy. See `MIGRATION.md` for how to retrieve them.
