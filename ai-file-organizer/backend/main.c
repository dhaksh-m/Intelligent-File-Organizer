#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>

#define MAX_FILES 1000

// File structure
typedef struct File {
    char name[100];
} File;

File files[MAX_FILES];
int fileCount = 0;

// Function declarations
void scanDirectory(char path[]);
void saveToFile();

// ---------------- MAIN ----------------
int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("❌ No folder path provided.\n");
        return 1;
    }

    printf("📂 Scanning: %s\n", argv[1]);

    scanDirectory(argv[1]);
    saveToFile();

    printf("✅ Scan complete.\n");
    return 0;
}

// ---------------- SCAN DIRECTORY ----------------
void scanDirectory(char path[]) {
    DIR *dir;
    struct dirent *entry;

    dir = opendir(path);

    if (dir == NULL) {
        printf("❌ Could not open directory.\n");
        return;
    }

    fileCount = 0;

    while ((entry = readdir(dir)) != NULL) {

        // Skip . and ..
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0)
            continue;

        if (fileCount < MAX_FILES) {
            strcpy(files[fileCount].name, entry->d_name);
            fileCount++;
        }
    }

    closedir(dir);

    printf("✅ Files Found: %d\n", fileCount);
}

// ---------------- SAVE OUTPUT ----------------
void saveToFile() {
    FILE *fp = fopen("../public/backend/output.txt", "w");

    if (fp == NULL) {
        printf("❌ Error writing file.\n");
        return;
    }

    for (int i = 0; i < fileCount; i++) {
        fprintf(fp, "%s\n", files[i].name);
    }

    fclose(fp);
}