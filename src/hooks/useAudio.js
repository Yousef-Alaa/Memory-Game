export default function useAudio(id) {
    document.getElementById(id).play();
    document.getElementById(id).muted = false;
}