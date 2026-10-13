"""Build the frontend practice-exam library from source DOCX files.

The script deliberately uses only Python's standard library so new DOCX sets
can be imported without adding a runtime dependency. Source documents remain
under docs/mock-exams/source and the generated JSON is safe to commit.
"""
from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "docs" / "mock-exams" / "source"
OUTPUT = ROOT / "frontend" / "src" / "data" / "mock-exams.json"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

SOURCES = [
    ("clf-c02-practice-01", "AWS_CLF-C02_Practice_Test_01.docx", "Đề thi thử CLF-C02 · Bộ 01", "verified"),
    ("clf-c02-practice-02", "AWS_CLF-C02_Practice_Test_02.docx", "Đề thi thử CLF-C02 · Bộ 02", "verified"),
    ("clf-c02-practice-03", "AWS_CLF-C02_Practice_Test_03.docx", "Đề thi thử CLF-C02 · Bộ 03", "placeholder"),
    ("clf-c02-practice-04", "AWS_CLF-C02_Practice_Test_04.docx", "Đề thi thử CLF-C02 · Bộ 04", "placeholder"),
    ("clf-c02-practice-05", "de-1.docx", "Đề thi thử CLF-C02 · Bộ 05", "verified"),
]

QUESTION = re.compile(r"^Question\s+(\d+)\s*(?:\(([^)]+)\))?:\s*(.+)$", re.I)
OPTION = re.compile(r"^([A-D])\.\s*(.+)$")
ANSWER = re.compile(r"^Question\s+(\d+):\s*(?:Đáp án\s*)?([A-D])\.?(?:\s*(.*))?$", re.I)


def docx_paragraphs(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as docx:
        root = ET.fromstring(docx.read("word/document.xml"))
    paragraphs = []
    for paragraph in root.findall(".//w:p", NS):
        text = "".join(node.text or "" for node in paragraph.findall(".//w:t", NS)).strip()
        if text:
            paragraphs.append(text)
    return paragraphs


def learning_tip(domain: str, correct_text: str) -> str:
    keyword = correct_text.strip().split(" ")[0] if correct_text.strip() else "đáp án đúng"
    return f"Mẹo thi: xác định domain {domain or 'AWS'} trước, rồi đối chiếu từ khóa “{keyword}” với yêu cầu đề bài; loại các dịch vụ có mục đích khác dù tên nghe gần giống."


def parse_exam(source: Path, exam_id: str, title: str, quality: str) -> dict:
    paragraphs = docx_paragraphs(source)
    try:
        answer_start = next(
            i for i, item in enumerate(paragraphs)
            if item.upper().startswith("PART 2:") or item.startswith("🗝️ ĐÁP ÁN")
        )
    except StopIteration:
        raise ValueError(f"Cannot find answer section in {source.name}")

    questions: dict[int, dict] = {}
    current: dict | None = None
    for line in paragraphs[:answer_start]:
        match = QUESTION.match(line)
        if match:
            number, domain, text = match.groups()
            current = {"number": int(number), "domain": domain or "CLF-C02", "question": text, "options": []}
            questions[current["number"]] = current
            continue
        option = OPTION.match(line)
        if option and current:
            current["options"].append({"id": option.group(1), "text": option.group(2)})

    answers: dict[int, dict] = {}
    active_number: int | None = None
    for line in paragraphs[answer_start:]:
        match = ANSWER.match(line)
        if match:
            number, answer, inline = match.groups()
            active_number = int(number)
            answers[active_number] = {"correct_option": answer, "explanation": inline.strip() if inline else ""}
            continue
        if active_number and (line.startswith("💡") or line.lower().startswith("giải thích")):
            explanation = re.sub(r"^(?:💡\s*)?(?:Giải thích:\s*)", "", line, flags=re.I).strip()
            answers[active_number]["explanation"] = explanation

    output_questions = []
    for number in range(1, 66):
        item = questions.get(number)
        answer = answers.get(number)
        if not item or not answer or len(item["options"]) != 4:
            raise ValueError(f"{source.name}: question {number} is incomplete")
        correct_text = next(option["text"] for option in item["options"] if option["id"] == answer["correct_option"])
        explanation = answer["explanation"] or f"Đáp án {answer['correct_option']} phù hợp nhất với yêu cầu của câu hỏi."
        output_questions.append({
            "id": f"{exam_id}-q{number}",
            "domain": item["domain"],
            "question": item["question"],
            "options": item["options"],
            "correct_option": answer["correct_option"],
            "explanation": explanation,
            "tip": learning_tip(item["domain"], correct_text),
        })
    return {
        "id": exam_id,
        "title": title,
        "certification": "AWS Certified Cloud Practitioner · CLF-C02",
        "duration_minutes": 90,
        "passing_score": 700,
        "question_count": len(output_questions),
        "source_quality": quality,
        "questions": output_questions,
    }


def main() -> None:
    exams = [parse_exam(SOURCE_DIR / filename, exam_id, title, quality) for exam_id, filename, title, quality in SOURCES]
    OUTPUT.write_text(json.dumps({"exams": exams}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {OUTPUT.relative_to(ROOT)} with {len(exams)} exams and {sum(len(exam['questions']) for exam in exams)} questions.")


if __name__ == "__main__":
    main()
