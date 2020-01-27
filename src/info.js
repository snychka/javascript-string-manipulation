var usage = "Usage: crlf-convert [CR|LF|CRLF]";

var help = "Usage: crlf-convert [CR|LF|CRLF]\n\n"
         + "Converts text between newline (\\n), carriage return (\\r), and combined\n"
         + "(\\r\\n) line endings.\n\n"
         + "Options:\n\n"
         + "[CR|LF|CRLF]: Desired line ending\n\n"
         + "    CR is a carriage return character \\r (rare)\n"
         + "    LF is a line feed character \\n (common on Unix and macOS)\n"
         + "    CRLF is a combined ending \\r\\n (common on Windows)\n"
         + "Example:\n\n"
         + "    cat in.txt | crlf-convert LF > out.txt";

module.exports = {
  help,
  usage
};
