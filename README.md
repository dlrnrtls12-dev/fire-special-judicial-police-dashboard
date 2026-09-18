# 소방특사경 사법처리절차 웹 대시보드

VS Code에서 수정하고, 웹 브라우저에서 실행하며, GitHub Pages 같은 정적 호스팅으로 공유할 수 있는 프로젝트입니다. 모든 HWP 서식은 원본과 PDF 사본을 함께 제공합니다. 상대방 PC에 한글 프로그램이 없어도 `PDF 보기·다운로드`를 사용할 수 있습니다.

## VS Code에서 실행

1. VS Code에서 이 폴더를 엽니다.
2. Node.js가 설치되어 있으면 터미널에서 `npm start`를 실행합니다.
3. 브라우저에서 `http://localhost:5500`을 엽니다.

VS Code의 `터미널 → 작업 실행 → 대시보드 로컬 서버 실행`을 사용해도 됩니다. Node.js가 없다면 권장 확장인 **Live Server**를 설치한 뒤 `index.html`에서 `Open with Live Server`를 선택할 수 있습니다. 단순 확인은 `index.html`을 더블클릭해도 됩니다.

## 온라인 공유

`.github/workflows/pages.yml`이 포함되어 있습니다.

1. 이 폴더를 GitHub 저장소에 올립니다.
2. 저장소 `Settings → Pages → Source`를 **GitHub Actions**로 선택합니다.
3. `main` 브랜치에 푸시하면 공개 주소가 자동 갱신됩니다.

> 중요: 일반 GitHub Pages 주소는 인터넷에 공개될 수 있습니다. 사건번호, 실명, 주민등록번호, 진술·수사기록 등 사건별 정보는 이 프로젝트에 넣지 마십시오. 내부 전용 운영이 필요하면 기관 내부 웹서버·승인된 클라우드 또는 접근통제가 가능한 정적 호스팅을 사용하십시오.

## 서식 갱신

- 업무서식 원본: `서식/`
- 업무서식 PDF: `서식_PDF/`
- 수사준칙 별지 원본: `법정서식/HWP/`
- 수사준칙 별지 PDF: `법정서식/PDF/`

HWP 원본을 교체한 다음, 한글 2018이 설치된 Windows에서 다음 스크립트를 실행하면 PDF를 다시 만듭니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/convert-hwp-to-pdf.ps1 `
  -ProcedureSourceRoot "서식" -ProcedurePdfRoot "서식_PDF" `
  -OfficialSourceRoot "법정서식/HWP" -OfficialPdfRoot "법정서식/PDF"
```

한컴 자동화는 사용목적에 따라 별도 라이선스가 필요할 수 있으므로 기관 배포 정책을 확인하십시오. 공식 안내: [한컴 한글 오토메이션 개발 가이드](https://developer.hancom.com/hwpautomation)

파일 짝을 확인하려면 `npm run check`를 실행합니다.

## 운영 원칙

- 대시보드는 절차 확인과 서식 접근을 돕는 참고도구입니다.
- 사건 당시 시행 법령, 기관 내부규정과 관할 검찰청의 구체적 지휘가 우선합니다.
- 법령 개정 시 조문·서식과 `현행 확인일`을 함께 갱신하십시오.

법령 현행 확인일: 2026-08-21 (기존 대시보드 기준)  
웹 배포 구조 점검일: 2026-08-23