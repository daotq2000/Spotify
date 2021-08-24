package com.spotify.ultils;

import java.io.File;

public class Utils {
    public static String getUrlFilePath(String fileName) {
        return Constraints.PATH_SERVER + fileName;
    }
        public static String getFileExtension(String fullName) {
        String fileName = new File(fullName).getName();
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
    }

}
