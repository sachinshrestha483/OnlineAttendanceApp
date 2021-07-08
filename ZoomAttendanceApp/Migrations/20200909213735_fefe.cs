using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ZoomAttendanceApp.Migrations
{
    public partial class fefe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.CreateTable(
                name: "Presences",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lectureId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presences", x => x.id);
                    table.ForeignKey(
                        name: "FK_Presences_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Presences_lectures_lectureId",
                        column: x => x.lectureId,
                        principalTable: "lectures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Presences_StudentId",
                table: "Presences",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Presences_lectureId",
                table: "Presences",
                column: "lectureId");

           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
       

            migrationBuilder.DropTable(
                name: "Presences");

          
        }
    }
}
