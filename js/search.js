$(document).ready(function() {
  // Get value on button click and show alert
  $("#myBtn").click(function() {
    var str = $("#myInput").val();
    // alert(str);
    $.getJSON("https://api.covid19india.org/state_district_wise.json", function(
      data
    ) {
      var x = "";
      $("#tbody").empty();
      $("#ending").empty();
      $.each(data, function(key, value) {
        if (key.toLowerCase() == str.toLowerCase()) {
          $.each(value, function(key1, value1) {
            $.each(value1, function(key2, value2) {
              x += "<tr>";
              x += "<td data-title='state' > " + key + "</td>";
              x += "<td data-title='district' > " + key2 + "</td>";
              x += "<td data-title='Confirmed'>" + value2.confirmed + "</td>";
            });
          });
        }
      });
      $("#table").append(x);
      if (!x) {
        $.getJSON("https://api.covid19india.org/data.json", function(data) {
          y = 0;
          $.each(data["statewise"], function(key, value) {
            if (value.state.toLowerCase() == str.toLowerCase()) {
              $("#ending").append("No known cases till Now!");
              y = 1;
              return false;
            }
          });
          if (y == 0) {
            $("#ending").append("Enter a valid state..");
          }
        });
      }
    });
  });
});
