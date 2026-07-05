import json
import tempfile

import streamlit as st

from groq_parser import refine_with_groq
from resume_parser import build_resume_json, extract_text_blocks, extract_summary_direct


st.set_page_config(page_title="Resume Parser", layout="wide")

st.title("🤖 AI Resume Parser")
st.write("Upload a PDF resume and get structured JSON output using a two-stage pipeline.")
st.info("**Stage 1:** PyMuPDF extracts raw data | **Stage 2:** Groq AI refines and cleans the output")

uploaded_file = st.file_uploader("Upload resume (PDF)", type=["pdf"])

if uploaded_file is not None:
    # Write uploaded bytes to a temporary file for PyMuPDF
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(uploaded_file.getbuffer())
        tmp_path = tmp_file.name

    with st.spinner("Stage 1: Extracting with PyMuPDF..."):
        initial_json = build_resume_json(tmp_path)
    
    st.success("Stage 1 complete!")
    
    # Debug: Show raw blocks and summary extraction
    with st.expander("🔍 Debug: Raw Text Blocks"):
        blocks = extract_text_blocks(tmp_path)
        st.write(f"**Total blocks: {len(blocks)}**")
        for i, block in enumerate(blocks):
            preview = block['text'][:100] + "..." if len(block['text']) > 100 else block['text']
            st.write(f"Block {i}: `{preview}`")
    
    with st.expander("🔍 Debug: Summary Extraction"):
        blocks = extract_text_blocks(tmp_path)
        summary = extract_summary_direct(blocks)
        st.write(f"**Extracted Summary:** `{summary}`")
        st.write(f"**Summary Length:** {len(summary)} characters")
    
    with st.expander("View Initial Parsed JSON"):
        st.code(json.dumps(initial_json, indent=2), language="json")
    
    with st.spinner("Stage 2: Refining with Groq AI..."):
        result = refine_with_groq(initial_json)
    
    st.success("Stage 2 complete!")

    st.subheader("Final Extracted JSON")
    st.code(json.dumps(result, indent=2), language="json")

    # Download button
    st.download_button(
        label="Download JSON",
        data=json.dumps(result, indent=2),
        file_name="resume_data.json",
        mime="application/json",
    )
