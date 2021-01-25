import * as FileSystem from "expo-file-system";

const audioDir = FileSystem.cacheDirectory + "audio/";
export const audioFileUri = (exampleId) => audioDir + `audio_${exampleId}.m4a`;

// Checks if audio directory exists. If not, creates it
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(audioDir);
  if (!dirInfo.exists) {
    console.log("Audio directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(audioDir, { intermediates: true });
  }
}

// Downloads all audios specified as array of IDs
export async function addMultipleAudios(examples) {
  try {
    await ensureDirExists();

    await Promise.all(
      examples.map(async (example) => {
        const fileInfo = await FileSystem.getInfoAsync(
          audioFileUri(example.id)
        );
        if (!fileInfo.exists) {
          console.log("Downloading", example.id, "audio files...");
          FileSystem.downloadAsync(
            example.audio_clip_url,
            audioFileUri(example.id)
          );
          console.log("Downloaded", example.id, "audio files...");
        }
      })
    );
  } catch (e) {
    console.error("Couldn't download audio files:", e);
  }
}

// // Returns URI to our local audio file
// // If our audio doesn't exist locally, it downloads it
// export async function getSingleAudio(audioId) {
//   await ensureDirExists();

//   const fileUri = audioFileUri(audioId);
//   const fileInfo = await FileSystem.getInfoAsync(fileUri);

//   if (!fileInfo.exists) {
//     console.log("Audio isn't cached locally. Downloading...");
//     await FileSystem.downloadAsync(audioUrl(audioId), fileUri);
//   }

//   return fileUri;
// }

// Exports shareable URI - it can be shared outside your app
export async function getAudioContentUri(audioId) {
  return FileSystem.getContentUriAsync(await getSingleAudio(audioId));
}

// Deletes whole giphy directory with all its content
export async function deleteAllAudios() {
  console.log("Deleting all Audio files...");
  await FileSystem.deleteAsync(audioDir);
}
