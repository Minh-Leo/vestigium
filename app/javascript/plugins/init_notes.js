// 1. add an event listener for the blur event (out of focus)
// 2. make ajax request directing to your own URL - method patch
  // 2a. .../favorites/:id

export const initNotes = () => {
  const noteFieldEls = document.querySelectorAll(".js-note-field");



  console.log(noteFieldEls)

  const sendAjaxRecuest = (url, noteValue) => {
    Rails.ajax({
      url: url,
      type: "PATCH",
      data: `note=${noteValue}`,
      success: function(data) {
        console.log(data);
      }
    });
  };

  noteFieldEls.forEach((element) => {
    element.addEventListener('keyup', (e) => {
      const thisElement = element;
      sendAjaxRecuest(thisElement.dataset.patchUrl, thisElement.value)
    });
  });


}
