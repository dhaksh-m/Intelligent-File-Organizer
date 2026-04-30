#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>

#define MAX_FILES 1000
#define MAX_EXT 50

// ---------- FILE STRUCT ----------
typedef struct {
    char name[256];
} File;

File files[MAX_FILES];
int fileCount = 0;

// ---------- EXTENSION COUNT ----------
typedef struct {
    char ext[20];
    int count;
} ExtCount;

ExtCount extCounts[MAX_EXT];
int extCountSize = 0;

// ---------- TRIE NODE ----------
typedef struct TrieNode {
    struct TrieNode* children[26];
    int isEnd;
} TrieNode;

// ---------- CREATE TRIE NODE ----------
TrieNode* createNode() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->isEnd = 0;
    for (int i = 0; i < 26; i++)
        node->children[i] = NULL;
    return node;
}

// ---------- INSERT INTO TRIE ----------
void insertTrie(TrieNode* root, char* word) {
    TrieNode* curr = root;

    for (int i = 0; word[i]; i++) {
        if (word[i] < 'a' || word[i] > 'z') continue;

        int idx = word[i] - 'a';

        if (!curr->children[idx])
            curr->children[idx] = createNode();

        curr = curr->children[idx];
    }
    curr->isEnd = 1;
}

// ---------- EXTENSION COUNT ----------
void addExtension(char* filename) {
    char* ext = strrchr(filename, '.');
    if (!ext) return;

    for (int i = 0; i < extCountSize; i++) {
        if (strcmp(extCounts[i].ext, ext) == 0) {
            extCounts[i].count++;
            return;
        }
    }

    strcpy(extCounts[extCountSize].ext, ext);
    extCounts[extCountSize].count = 1;
    extCountSize++;
}

// ---------- SCAN DIRECTORY ----------
void scanDirectory(char* path, TrieNode* root) {
    struct dirent* entry;
    DIR* dir = opendir(path);

    if (!dir) {
        printf("ERROR\n");
        return;
    }

    while ((entry = readdir(dir)) != NULL) {
        if (entry->d_type == DT_REG) {
            strcpy(files[fileCount].name, entry->d_name);

            addExtension(entry->d_name);

            // Insert lowercase version into Trie
            char temp[256];
            strcpy(temp, entry->d_name);
            for (int i = 0; temp[i]; i++)
                temp[i] = tolower(temp[i]);

            insertTrie(root, temp);

            fileCount++;
        }
    }

    closedir(dir);
}

// ---------- DUPLICATE CHECK ----------
void findDuplicates() {
    printf("DUPLICATES:\n");

    int found = 0;
    for (int i = 0; i < fileCount; i++) {
        for (int j = i + 1; j < fileCount; j++) {
            if (strcmp(files[i].name, files[j].name) == 0) {
                printf("%s\n", files[i].name);
                found = 1;
            }
        }
    }

    if (!found)
        printf("NONE\n");
}

// ---------- PRINT RESULTS ----------
void printResults() {
    printf("FILES:\n");
    for (int i = 0; i < fileCount; i++) {
        printf("%s\n", files[i].name);
    }

    printf("EXTENSIONS:\n");
    for (int i = 0; i < extCountSize; i++) {
        printf("%s %d\n", extCounts[i].ext, extCounts[i].count);
    }

    findDuplicates();
}

// ---------- MAIN ----------
int main(int argc, char* argv[]) {
    if (argc < 2) {
        printf("No path provided\n");
        return 1;
    }

    TrieNode* root = createNode();

    scanDirectory(argv[1], root);

    printResults();

    return 0;
}